#include <iostream>
#include <algorithm>
#include <vector>
#include <stack>
using namespace std;
int main()
{
    int arr[] = {40 , 
        100 ,
        10 ,
        71  ,
        57  ,
        78  ,
        125  ,
        42  ,
        47,
        67 ,
        60 ,
        47,
        42 ,
        43};
    int n = sizeof(arr)/sizeof(arr[0]);
    int sum = 0;
    for(int i = 0; i < n; i++)
    {
        sum += arr[i];
    }
    cout<<sum;
    
	
}





/*

<?xml version="1.0" encoding="utf-8"?> 
<androidx.constraintlayout.widget.ConstraintLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <!-- TextView displaying "Hello World!" -->
    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintBottom_toTopOf="@+id/button" />

    <!-- Play Button -->
    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="plays"
        android:text="Play"
        app:layout_constraintTop_toBottomOf="@+id/textView"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5" />

    <!-- Stop Button -->
    <Button
        android:id="@+id/button2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="stop"
        android:text="Stop"
        app:layout_constraintTop_toBottomOf="@+id/button"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5" />

</androidx.constraintlayout.widget.ConstraintLayout>






*/