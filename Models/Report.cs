namespace PomodoroApp.Models;

public class LogReport
{
    public double TotalHoursFocused { get; set; }
    public int DaysAccessed { get; set; }
    public int DayStreak { get; set; }
    public string FrequentTimerMode { get; set; } = string.Empty;
    public double FrequentTimerDuration { get; set; }
}
