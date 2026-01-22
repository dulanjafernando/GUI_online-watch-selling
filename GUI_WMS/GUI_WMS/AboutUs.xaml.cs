using System;
using System.Windows;

namespace GUI_WMS
{
    public partial class AboutUs : Window
    {
        public AboutUs()
        {
            InitializeComponent();
        }

        // Event handler for the "Back to Home" button
        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            // Close the AboutUs page
            

            // Open the HomePage (MainWindow)
            MainWindow mainWindow = new MainWindow();
            mainWindow.Show();
            this.Close();
        }
    }
}
