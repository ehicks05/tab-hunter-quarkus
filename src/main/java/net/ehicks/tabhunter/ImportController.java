package net.ehicks.tabhunter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.net.URI;

@Path("/import")
public class ImportController
{
    private static final Logger log = LoggerFactory.getLogger(ImportController.class);

    @Inject
    ClassicTabImporter classicTabImporter;

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAjaxSearchResults() throws IOException
    {
        classicTabImporter.doImport();

        return Response.temporaryRedirect(URI.create("/")).build();
    }
}
