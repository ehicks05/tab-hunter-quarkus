package net.ehicks.tabhunter;

import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/api")
public class MainController
{
    private static final Logger log = LoggerFactory.getLogger(MainController.class);

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Tab> showAll()
    {
        return Tab.list("", Sort.by("views"));
    }

    @GET
    @Path("/top")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Tab> showTop()
    {
        return Tab.find("", Sort.by("views"))
                .page(Page.ofSize(50))
                .list();
    }

    @GET
    @Path("/tab/{hash}")
    @Produces(MediaType.APPLICATION_JSON)
    public Tab showTab(@PathParam("hash") int tabHash)
    {
        Tab tab = Tab.findByHash(tabHash);
        if (tab == null)
            log.error("couldn't find tab.");
        else
        {
            tab.views += 1;
            tab.persist();
        }
        return tab;
    }

    @GET
    @Path("/artist/{artist}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Tab> showArtistTabs(@PathParam("artist") String artist)
    {
        return Tab.list("artist", artist);
    }

    //    public class TabListingSerializer extends StdSerializer<Tab>
//    {
//
//        public TabListingSerializer() {
//            this(null);
//        }
//
//        public TabListingSerializer(Class<Tab> t) {
//            super(t);
//        }
//
//        @Override
//        public void serialize(
//                Tab value, JsonGenerator jgen, SerializerProvider provider)
//                throws IOException, JsonProcessingException
//        {
//
//            jgen.writeStartObject();
//            jgen.writeNumberField("hash", value.getHash());
//            jgen.writeStringField("artist", value.getArtist());
//            jgen.writeStringField("name", value.getName());
//            jgen.writeNumberField("rating", value.getRating());
//            jgen.writeNumberField("numberRates", value.getNumberRates());
//            jgen.writeStringField("type", value.getType());
//            jgen.writeNumberField("views", value.getViews());
//            jgen.writeEndObject();
//        }
//    }
}