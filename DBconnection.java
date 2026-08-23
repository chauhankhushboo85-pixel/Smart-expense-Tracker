package com.smartexpense;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBconnection {

    public static Connection getConnection() {

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/expense_tracker",
                "root",
                "NewPassword123!"
            );

            System.out.println("========== DATABASE CONNECTED ==========");

            return con;

        } catch (Exception e) {

            System.out.println("========== DATABASE CONNECTION FAILED ==========");
            e.printStackTrace();

            return null;
        }
    }
}

  