   M S B A M L   `   `   `  ����B  >GUI_WMS, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null!clr-namespace:GUI_WMSGUI_WMS  5   	       GUI_WMS.DetailsForm   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   'localclr-namespace:GUI_WMS     5   	     � Title$  DetailsForm��5   	   $	��600��6   $	��900��6*    � WindowStartupLocation$ CenterScreen=�66   .��5
      � .+�5   
   �� $��Stretch=�6   $��Stretch=�62   ��5      �� 5       �� ImageSource$1 +C:\Users\User\Documents\watches\watch_2.PNG��6    �� Opacity$	 0.4Q�6W   5      � 5   
   $��Center=�6   $��Center=�6,   $	��400��6G   .+�5      �� $��Center=�6   $��Center=�64   .+�5      �� $��Details Form��6   $��30(�5      $
��Bold"�5      
���   �$��Italic)�5      $��Center=�5      $��0,0,0,0q�5      �� 5"       �� Orientation$ 
Horizontal=�6   $
��0,10q�66   .+�5#      �� $��Name:��6    $��Center=�6-   
���   �$
��Bold"�6[   $��14(�6m   $	��100��6{   �� 5$      -   5         ��Name$ NameTextBox��5$      $	��290��63   $��25��6?   $��5q�6K   
 � Tag$
 Name��6V   5%      �� 5(      $ 
Horizontal=�6   $
��0,10q�66   .+�5)      �� $��Email:��6    $��Center=�6.   
���   �$
��Bold"�6\   $��14(�6n   $	��100��6|   �� 5*      -   5        $ EmailTextBox��5*      $	��290��64   $��25��6@   $��5q�6L   $ Email��6W   5+      �� 5.      $ 
Horizontal=�6   $
��0,10q�66   .+�5/      �� $��	District:��6    $��Center=�61   
���   �$
��Bold"�6_   $��14(�6q   $	��100��6   �� 50      -   5        $ DistrictTextBox��50      $	��290��67   $��25��6C   $��5q�6O   $ District��6Z   51      �� 54      $ 
Horizontal=�6   $
��0,10q�66   .+�55      �� $��Address:��6    $��Center=�60   
���   �$
��Bold"�6^   $��14(�6p   $	��100��6~   �� 56      -   5        $ AddressTextBox��56      $	��290��66   $��25��6B   $��5q�6N   $ Address��6Y   57      �� 5:      $ 
Horizontal=�6   $
��0,10q�66   .+�5;      �� $��
Telephone:��6    $��Center=�62   
���   �$
��Bold"�6`   $��14(�6r   $	��100��6�   �� 5<      -   5        $ TelephoneTextBox��5<      $	��290��68   $��25��6D   $��5q�6P   $ Telephone Number��6[   5=      �� 5@      $ 
Horizontal=�6   $
��0,10q�66   .+�5A      �� $��Description:��6    $��Center=�64   
���   �$
��Bold"�6b   $��14(�6t   $	��100��6�   �� 5B      -   5        $ DescriptionTextBox��5B      $	��290��6:   $��55��6F   $��5q�6R   $ Description��6]    �� AcceptsReturn$
 True��6o   6�   5C      �� 5F      $ 
Horizontal=�6   $
��0,10q�66   .+�5G      �� $��Watch Option:��6    $��Center=�65   
���   �$
��Bold"�6c   $��14(�6u   $	��100��6�   �� 5H      -   5         ��Name$ WatchOptionComboBox��5H      $	��294��6<   $��25��6H   .@�5I      �� $��Android Watch��6'   �� 5J      $��Apple Watch��6'   �� 5K      $��Phone Watch��6'   �� 5L      $��Children Watch��6'   �� 5M      $��
Bell Watch��6'   5N      5O      �� 5R      $ 
Horizontal=�6   $��Center=�66   $
��0,10q�6S   .+�5T      �� -   5        $��Submit��5T      $	��120��6.   $��40��6:   
���  ��
�������$��16(�6j   $
��Bold"�6x   $
��0,10q�6�   �� 5W      -	   5        $��Logout��5W      $	��120��6.   $��40��6:   
����p��
�������$��16(�6�   $
��Bold"�6�   5X      5Z      5\      5^      5_      