using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PomodoroApp.Data;
using PomodoroApp.Models;

namespace PomodoroApp.Pages;

[IgnoreAntiforgeryToken]
public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<AppUser> _userManager;

    public IndexModel(
        ApplicationDbContext context,
        UserManager<AppUser> userManager,
        ILogger<IndexModel> logger
        )
    {
        _context = context;
        _userManager = userManager;
        _logger = logger;
    }

    public void OnGet() { }

    // the handler method for LogTimer
    public async Task<IActionResult> OnPostLogTimerAsync([FromBody] LogDto dto)
    {
        if (User.Identity?.IsAuthenticated ?? false)
        {
            var userId = _userManager.GetUserId(User)!;

            var log = new Log
            {
                UserId = userId,
                Type = dto.Type, // "Pomodoro", "ShortBreak", etc.
                StartTimeUtc = dto.StartTimeUtc,
                EndTimeUtc = dto.EndTimeUtc
            };

            _context.Logs.Add(log);
            await _context.SaveChangesAsync();
        }

        return new JsonResult(new { success = true });
    }

    public async Task<JsonResult> OnGetLogReportsAsync()
    {
        if (!(User.Identity?.IsAuthenticated ?? false))
        {
            return new JsonResult(new { error = "NotLoggedIn" });
        }

        var userId = _userManager.GetUserId(User);

        var logs = await _context.Logs
          .Where(l => l.UserId == userId)
          .ToListAsync();

        if (!logs.Any())
            return new JsonResult(new LogReport());

        // Calculate durations in minutes
        var logsWithDuration = logs.Select(l => new
        {
            l.Type,
            DurationMinutes = (l.EndTimeUtc - l.StartTimeUtc).TotalMinutes,
            Date = l.StartTimeUtc.Date
        }).ToList();

        // Total hours focused
        var hoursFocused = logsWithDuration
            .Where(l => l.Type == "Pomodoro")
            .Sum(l => l.DurationMinutes) / 60.0;

        // Distinct days accessed
        var distinctDates = logsWithDuration.Select(l => l.Date).Distinct().ToList();
        var daysAccessed = distinctDates.Count;

        // Day streak
        var dayStreak = CalculateDayStreak(distinctDates);

        // Most frequent mode
        var frequentMode = logsWithDuration
            .GroupBy(l => l.Type)
            .OrderByDescending(g => g.Count())
            .Select(g => g.Key)
            .FirstOrDefault() ?? string.Empty;

        // Most frequent duration
        var frequentDuration = logsWithDuration
            .GroupBy(l => l.DurationMinutes)
            .OrderByDescending(g => g.Count())
            .Select(g => g.Key)
            .FirstOrDefault();

        var report = new LogReport
        {
            TotalHoursFocused = hoursFocused,
            DaysAccessed = daysAccessed,
            DayStreak = dayStreak,
            FrequentTimerMode = frequentMode,
            FrequentTimerDuration = frequentDuration
        };

        return new JsonResult(report);
    }

    // Helper method for streak calculation
    private int CalculateDayStreak(List<DateTime> distinctDates)
    {
        if (!distinctDates.Any()) return 0;

        distinctDates.Sort();
        int streak = 1;
        int maxStreak = 1;

        for (int i = 1; i < distinctDates.Count; i++)
        {
            if ((distinctDates[i] - distinctDates[i - 1]).TotalDays == 1)
                streak++;
            else if ((distinctDates[i] - distinctDates[i - 1]).TotalDays > 1)
                streak = 1;

            if (streak > maxStreak)
                maxStreak = streak;
        }

        return maxStreak;
    }
}

public class LogDto
{
    public string Type { get; set; } = string.Empty;
    public DateTime StartTimeUtc { get; set; }
    public DateTime EndTimeUtc { get; set; }
}
