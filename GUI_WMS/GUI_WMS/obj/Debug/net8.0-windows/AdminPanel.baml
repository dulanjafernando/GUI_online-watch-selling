   M S B A M L   `   `   `  ����B  >GUI_WMS, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null!clr-namespace:GUI_WMSGUI_WMS  5   	       GUI_WMS.AdminPanel   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   'localclr-namespace:GUI_WMS     5   	     � Title$  
AdminPanel��5   	   $	��450��6   $	��800��6)    � WindowStartupLocation$ CenterScreen=�66   .��5
      � .+�5   
   ��  �� Orientation$ 
Horizontal=�6   $
��Left=�6.   $	��Top=�6I   $��
10,10,10,0q�6a   .+�5      �� -   5         ��Name$ 	AddButton��5      $	��Add��6(   $	��100��66   $��5q�6B   
����  �
�������6_   �� 5      -   5        $ 
EditButton��5      $
��Edit��6)   $	��100��68   $��5q�6D   
���  ��
�������6`   �� 5      -   5        $ DeleteButton��5      $��Delete��6+   $	��100��6<   $��5q�6H   
��� ���
�������6g   �� 5      -   5        $ LogoutButton��5      $��Logout��6+   $	��100��6<   $��5q�6H   
������
���   �6k   5      &   System.Windows.Controls.DataGrid  5   
   -   5          Name$ DataGrid��5      $��Stretch=�6%   $��Stretch=�6C   $��10,60,10,10q�6_      AutoGenerateColumns$ False��6t      Columns 5      0  *System.Windows.Controls.DataGridTextColumn  5      ,  &System.Windows.Controls.DataGridColumn   Header$
 Name��6%      Width5  /System.Windows.Controls.DataGridLengthConverter$ * 6L   1  +System.Windows.Controls.DataGridBoundColumn	   Binding	 63   �� *Name+6L     5      $ Price��6%   $ * 6N   	 64   �� *Price+6N     5      $ Telephone Number��6%   $ * 6c   	 6?   �� *TelephoneNumber+6c     5       $ District��6%   $ * 6T   	 67   �� *
District+6T     5!      $ Watch Option��6%   $ * 6[   	 6;   �� *WatchOption+6[   5#      5$      5%      