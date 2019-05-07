package net.ehicks.tabhunter;

import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Path("/")
public class MyResource {
    private static final Logger log = LoggerFactory.getLogger(MyResource.class);

    @Path("/hello")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Tab tab() {
        Tab tab = new Tab();
        tab.persist();
        return tab;
    }

    @Path("/")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Tab> showIndex()
    {
        return Tab.list("", Sort.by("views"));
    }

    @GET
    @Path("/all")
    public List<Tab> showAll()
    {
        return Tab.find("", Sort.by("views"))
                .page(Page.ofSize(50))
                .list();
    }

    @GET
    @Path("/tab/{hash}")
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
    @Path("/tab/{artist}")
    public List<Tab> showArtistTabs(@PathParam("artist") String artist)
    {
        return Tab.list("artist", artist);
    }

    @GET
    @Path("/search")
    public Object getSearchResults(@FormParam("query") String query, @FormParam("artist") String artist, @FormParam("name") String name)
    {
        if (artist == null) artist = "";
        if (name == null) name = "";

        if (query.isEmpty() && artist.isEmpty() && name.isEmpty())
            return Response.temporaryRedirect(URI.create("/"));

        if (artist.isEmpty() && name.isEmpty() && query.contains(" - "))
        {
            artist = query.split(" - ")[0];
            name = query.split(" - ")[1];
        }

        List<Tab> tabs;

        // todo ignore case
        if (!artist.isEmpty() && !name.isEmpty())
            tabs = Tab.find("artist like ?1 and name like ?2", "%" + artist + "%", "%" + name + "%").firstPage().list();
        else
            tabs = Tab.find("artist like ?1 or name like ?2", "%" + artist + "%", "%" + name + "%").firstPage().list();

        return tabs;
    }

    @GET
    @Path("/ajaxSearch")
    @Produces(MediaType.APPLICATION_JSON)
    public List<AjaxSearchResult> getAjaxSearchResults(@FormParam("query") String query)
    {
        List<Tab> tabs = Tab.find("artist like ?1 or name like ?2", "%" + query + "%", "%" + query + "%").firstPage().list();

        return tabs.stream()
                .map(tab -> new AjaxSearchResult(tab.artist, tab.name, tab.artist + " - " + tab.name))
                .distinct().collect(Collectors.toList());
    }

    public class AjaxSearchResult
    {
        private String artist;
        private String name;
        private String display;

        public AjaxSearchResult(String artist, String name, String display)
        {
            this.artist = artist;
            this.name = name;
            this.display = display;
        }

        @Override
        public boolean equals(Object o)
        {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            AjaxSearchResult that = (AjaxSearchResult) o;
            return Objects.equals(display, that.display);
        }

        @Override
        public int hashCode()
        {
            return Objects.hash(display);
        }

        public String getArtist()
        {
            return artist;
        }

        public void setArtist(String artist)
        {
            this.artist = artist;
        }

        public String getName()
        {
            return name;
        }

        public void setName(String name)
        {
            this.name = name;
        }

        public String getDisplay()
        {
            return display;
        }

        public void setDisplay(String display)
        {
            this.display = display;
        }
    }
}