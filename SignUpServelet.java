package com.smartexpense;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/signup")
public class SignUpServelet extends HttpServlet {

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        String sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        try {

        	Connection con = DBconnection.getConnection();

        	if (con == null) {
        	    response.getWriter().println("Database connection failed. Check Eclipse Console.");
        	    return;
        	}

        	PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, name);
            ps.setString(2, email);
            ps.setString(3, password);

            int result = ps.executeUpdate();

            if (result > 0) {

                response.sendRedirect("SignIn.html");

            }

            ps.close();
            con.close();

        } catch (Exception e) {

            e.printStackTrace();

            response.getWriter().println("Signup failed: " + e.getMessage());
        }
    }
}
