using System;
using System.Windows;

namespace GUI_WMS
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Ensure the database is created when the application starts
            using (var db = new UserDbContext())
            {
                db.Database.EnsureCreated(); // Ensure the database is created
                Console.WriteLine("Database created successfully.");
            }
        }

        // Event handler for the About button click
        private void AboutButton_Click(object sender, RoutedEventArgs e)
        {
            // Open the AboutUs window
            AboutUs lo = new AboutUs();
            lo.Show();
            this.Close(); // Close the main window
        }

        // Event handler for the Home button click
        private void HomeButton_Click(object sender, RoutedEventArgs e)
        {
            // Logic for Home button click (you can add more functionality here)
            Console.WriteLine("Home button clicked.");
        }

        // Event handler for the Login button click
        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            // Open the Login window
            LoginWindow lo = new LoginWindow();
            lo.Show();
            this.Close(); // Close the main window
        }

        // Event handler for the Register button click
        private void RegisterButton_Click(object sender, RoutedEventArgs e)
        {
            // Open the Register window
            RegisterPage lo = new RegisterPage();
            lo.Show();
            this.Close(); // Close the main window
        }

        // Event handler for the "Available" button click
        private void BookSlotButton_Click(object sender, RoutedEventArgs e)
        {
            // This method will handle the button click event when "Available" is clicked
            MessageBox.Show("Slot has been booked for the selected watch.");
            // You can replace this with your actual logic for booking the slot (e.g., updating the database)
        }
    }
}
