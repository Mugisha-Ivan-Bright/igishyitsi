package org.example.esubmission.socket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class Client {
    public static void main(String[] args) {
        try (Socket socket = new Socket("localhost", 1234);) {
            BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);
            output.print("Hello Server");
            String response = input.readLine();
            System.out.println("Server says: " + response);
        }
        catch (IOException e){
            e.printStackTrace();
        }
    }
}
