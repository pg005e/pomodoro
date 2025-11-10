using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PomodoroApp.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;

    public IndexModel(ILogger<IndexModel> logger)
    {
        _logger = logger;
    }

    // server response on GET request
    public void OnGet() { }

    public int PomodoroDuration = 25;
    public int ShortBreakDuration = 5;
    public int LongBreakDuration = 15;
}
