using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace GUI_WMS
{
    public partial class LoginWindow : Window
    {
        public LoginWindow()
        {
            InitializeComponent();
        }

        // Event handler for the Login button click
        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            // Retrieve the user input
            string email = EmailTextBox.Text;
            string password = PasswordBox.Password;

            // Simple validation (check if fields are empty)
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
            {
                DisplayErrorMessage("Please fill in both email and password.");
                return;
            }

            // Simple hardcoded validation (for demonstration)
            if (email == "test@example.com" && password == "password")
            {
                MessageBox.Show("Login successful!");
                // Proceed with your logic here (open another window, etc.)
                // For example, navigate to the main window or dashboard:
                // MainWindow mainWindow = new MainWindow();
                // mainWindow.Show();

                this.Close();  // Close login window (optional)
            }
            else
            {
                DisplayErrorMessage("Invalid email or password.");
            }
        }

        // Display error message on login failure
        private void DisplayErrorMessage(string message)
        {
            ErrorMessage.Text = message;
            ErrorMessage.Visibility = Visibility.Visible;
        }

        // Event handler to clear placeholder text when the email TextBox gets focus
        private void EmailTextBox_GotFocus(object sender, RoutedEventArgs e)
        {
            if (EmailTextBox.Text == "Enter your email")
            {
                EmailTextBox.Clear();
                EmailTextBox.Foreground = Brushes.Black;
            }
        }

        // Event handler to restore placeholder text when the email TextBox loses focus
        private void EmailTextBox_LostFocus(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(EmailTextBox.Text))
            {
                EmailTextBox.Foreground = Brushes.Gray;
                EmailTextBox.Text = "Enter your email";
            }
        }

        // Event handler to clear placeholder text when the password PasswordBox gets focus
        private void PasswordBox_GotFocus(object sender, RoutedEventArgs e)
        {
            if (PasswordBox.Password == "Enter your password")
            {
                PasswordBox.Clear();
                PasswordBox.Foreground = Brushes.Black;
            }
        }

        // Event handler to restore placeholder text when the password PasswordBox loses focus
        private void PasswordBox_LostFocus(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(PasswordBox.Password))
            {
                PasswordBox.Foreground = Brushes.Gray;
                PasswordBox.Password = "Enter your password";
            }
        }

        // Button hover effect to change background color
        private void Button_MouseEnter(object sender, System.Windows.Input.MouseEventArgs e)
        {
            Button btn = (Button)sender;
            btn.Background = Brushes.Green;
        }

        private void Button_MouseLeave(object sender, System.Windows.Input.MouseEventArgs e)
        {
            Button btn = (Button)sender;
            btn.Background = Brushes.SeaGreen;
        }

        // Event handler for the Back to Register button click
        private void BackToRegisterButton_Click(object sender, RoutedEventArgs e)
        {
            // Code to navigate to the Register page
            MainWindow registerPage = new MainWindow();
            registerPage.Show();
            this.Close();  // Close the login window
        }
    }
}
