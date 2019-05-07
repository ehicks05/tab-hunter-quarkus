package net.ehicks.tabhunter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.json.JsonArray;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URI;
import java.nio.charset.Charset;

@Path("/admin")
public class AdminController
{
    private static final Logger log = LoggerFactory.getLogger(AdminController.class);

    @Inject
    TabLogic tabLogic;

    @GET
    @Path("/")
    public String showAdmin()
    {
        return "";
    }

    @GET
    @Path("/search")
    public Response adminSearch(@FormParam("query") String query)
    {
        ProcessBuilder processBuilder = new ProcessBuilder("node", "c:/projects/ugs/index.js", query);
        try
        {
            Process p = processBuilder.start();
            OutputStream processIn = p.getOutputStream();
            InputStream processOut = p.getInputStream();

            StringBuilder sb = new StringBuilder();
            byte[] bytes = new byte[4096];
            while (processOut.read(bytes) != -1)
            {
                sb.append(new String(bytes, Charset.forName("UTF-8")));
            }

            

//            ObjectMapper objectMapper = new ObjectMapper();
//            objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
//            objectMapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
//
//            UGSTab[] ugsTabs = objectMapper.readValue(sb.toString(), UGSTab[].class);
//            for (UGSTab ugsTab : ugsTabs)
//            {
//                tabLogic.insertTab(ugsTab.getArtist(), ugsTab.getName(), ugsTab.getContent(), ugsTab.getType(),
//                        ugsTab.getRating(), ugsTab.getNumberRates(), "https://www.ultimate-guitar.com/", ugsTab.getUrl(),
//                        ugsTab.getCapo(), ugsTab.getDifficulty(), ugsTab.getTuning(), ugsTab.getTonality());
//            }
        }
        catch (IOException e)
        {
            log.error(e.getMessage(), e);
        }

        return Response.temporaryRedirect(URI.create("/search?query=" + query)).build();
    }
}
