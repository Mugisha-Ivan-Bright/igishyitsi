package org.example.esubmission.socket;

import jdk.swing.interop.SwingInterOpUtils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
    public static void main(String[] args) {
        try(ServerSocket serverSocket = new ServerSocket(12345);){
            System.out.println("Server is listening on port 12345");
            Socket socket  = serverSocket.accept();
            System.out.println("Client connected");

            BufferedReader input  = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);

            String message = input.readLine();
            System.out.println("Received message: " + message);

            output.println("Hello from Server");

            socket.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}
