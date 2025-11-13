using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Identity;
using PomodoroApp.Data;

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

    // server response on GET request
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
        else
        {
            Console.WriteLine("user isn't logged in", dto);
        }

        return new JsonResult(new { success = true });
    }
}

public class LogDto
{
    public string Type { get; set; } = string.Empty;
    public DateTime StartTimeUtc { get; set; }
    public DateTime EndTimeUtc { get; set; }
}
