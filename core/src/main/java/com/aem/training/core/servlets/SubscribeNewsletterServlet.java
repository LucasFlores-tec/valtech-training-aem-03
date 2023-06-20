package com.aem.training.core.servlets;

import com.day.cq.commons.jcr.JcrUtil;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.Servlet;
import java.io.IOException;
import java.io.PrintWriter;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_GET;
import static org.apache.sling.api.servlets.ServletResolverConstants.*;

@Component (
        service = Servlet.class,
        immediate = true,
        property = {
            Constants.SERVICE_DESCRIPTION + "=Servlet used to store subscribers' data into JCR.",
            SLING_SERVLET_PATHS + "=/bin/newsletter/subscribe",
            SLING_SERVLET_METHODS + "=POST"
        }
)
public class SubscribeNewsletterServlet extends SlingAllMethodsServlet {

    private static final Logger LOGGER = LoggerFactory.getLogger(SubscribeNewsletterServlet.class);
    private static final String CREATE_PATH = "/newsletter/subscribers";

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) {

        ResourceResolver resourceResolver = request.getResourceResolver();
        Session session = resourceResolver.adaptTo(Session.class);

        String fName = request.getParameter("name");
        String lName = request.getParameter("surname");
        String email = request.getParameter("email");
        String monthOfBirth = request.getParameter("anniversary_month");
        String authorize = request.getParameter("authorize");

        try {
            PrintWriter out = response.getWriter();

            Node subscribers = JcrUtil.createPath(CREATE_PATH + "/items", "nt:unstructured", session);
            Node subscriber = JcrUtil.createPath(subscribers.getPath() + "/" + fName + lName + System.currentTimeMillis(), "nt:unstructured", session);

            subscriber.setProperty("name", fName.toLowerCase());
            subscriber.setProperty("surname", lName.toLowerCase());
            subscriber.setProperty("email", email.toLowerCase());
            subscriber.setProperty("monthofbirth", monthOfBirth.toLowerCase());
            subscriber.setProperty("authorized", authorize.toLowerCase());

            session.save();

            out.println("Subscribed successfully...");
            out.flush();
            out.close();
        }
        catch (IOException | RepositoryException e) {
            LOGGER.error(e.getMessage());
        }
    }
}