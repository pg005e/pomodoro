public class Log
{
    public int Id { get; set; }
    public string UserId { get; set; } = null!;
    public AppUser User { get; set; } = null!;
    public string Type { get; set; } = null!; // "Pomodoro", "ShortBreak", "LongBreak"
    public DateTime StartTimeUtc { get; set; } // store UTC
    public DateTime EndTimeUtc { get; set; }   // store UTC

    public double DurationMinutes => (EndTimeUtc - StartTimeUtc).TotalMinutes;
}
