using System;
using System.Collections.Generic;
using System.Windows;

namespace GUI_WMS
{
    public partial class AdminPanel : Window
    {
        public AdminPanel()
        {
            InitializeComponent();

            // Sample data for the DataGrid
            List<Item> items = new List<Item>
            {
                new Item { Name = "Item 1", Price = 100, TelephoneNumber = "123-456-7890", District = "District A" },
                new Item { Name = "Item 2", Price = 200, TelephoneNumber = "987-654-3210", District = "District B" },
            };

            // Setting the DataGrid's DataSource
            DataGrid.ItemsSource = items;
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            // Close the AdminPanel and show the DetailsForm
            this.Hide(); // Hide the current window instead of closing it
            DetailsForm detailsForm = new DetailsForm();
            detailsForm.Show();
        }

        private void EditButton_Click(object sender, RoutedEventArgs e)
        {
            // Logic for editing an item (you can add this functionality as needed)
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            // Logic for deleting an item (you can add this functionality as needed)
        }

        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            // Close the AdminPanel and show the MainWindow
            Application.Current.MainWindow = new MainWindow(); // Set the new MainWindow
            this.Close(); // Close the AdminPanel window

            // Show the MainWindow
            Application.Current.MainWindow.Show();
        }
    }

    // Sample class for the DataGrid
    public class Item
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string TelephoneNumber { get; set; }
        public string District { get; set; }
        public string WatchOption { get; set; }
    }
}
