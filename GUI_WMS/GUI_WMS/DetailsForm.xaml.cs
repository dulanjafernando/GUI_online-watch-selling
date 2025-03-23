using System.Windows;

namespace GUI_WMS
{
    public partial class DetailsForm : Window
    {
        public DetailsForm()
        {
            InitializeComponent();
        }

        // Back Button Logic
        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            // Close the current window
            
            LoginWindow mainWindow = new LoginWindow();
            mainWindow.Show();
            this.Close();
            // You can modify this to navigate to another page if needed
        }

        // Submit Button Logic
        private void SubmitButton_Click(object sender, RoutedEventArgs e)
        {
            // Handle form submission logic, for instance, collecting data
            // For now, display a success message
            MessageBox.Show("Form Submitted Successfully!");
            AdminPanel mainWindow = new AdminPanel();
            mainWindow.Show();
            this.Close();
        }

        private void DescriptionTextBox_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e)
        {

        }
    }
}
