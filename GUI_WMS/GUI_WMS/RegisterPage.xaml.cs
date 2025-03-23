using System;
using System.Windows;

namespace GUI_WMS
{
    public partial class RegisterPage : Window
    {
        public RegisterPage()
        {
            InitializeComponent();
        }

        // Event handler for the "Register" button click
        private void RegisterButton_Click(object sender, RoutedEventArgs e)
        {
            // You can write your logic for registration here.
            // For example:
            string username = UsernameTextBox.Text;
            string email = EmailTextBox.Text;
            string password = PasswordBox.Password;
            string confirmPassword = ConfirmPasswordBox.Password;

            if (password == confirmPassword)
            {
                MessageBox.Show("Registration successful!");
                // You can add further actions like saving the data in a database
            }
            else
            {
                MessageBox.Show("Passwords do not match. Please try again.");
            }
        }

        // Event handler for the "Back to Login" button click
        private void BackToLoginButton_Click(object sender, RoutedEventArgs e)
        {
            // Close the RegisterPage
            

            // Open the LoginPage (LoginWindow)
            LoginWindow loginPage = new LoginWindow();
            loginPage.Show();
            this.Close();
        }
    }
}
