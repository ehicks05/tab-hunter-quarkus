package net.ehicks.tabhunter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;
import java.sql.Timestamp;
import java.util.List;

@ApplicationScoped
public class TabLogic
{
    private static final Logger log = LoggerFactory.getLogger(TabLogic.class);

    public void insertTab(String artist, String name, String content, String type, double rating, int numberRates,
                                 String source, String url, String capo, String difficulty, String tuning, String tonality)
    {

        if (isContentUnique(artist, name, content))
        {
            log.info("Adding {} - {}", artist, name);
            Tab tab = new Tab();
            tab.artist = artist;
            tab.name = name;
            tab.content = content;
            tab.createdOn = new Timestamp(System.currentTimeMillis());
            tab.rating = rating;
            tab.numberRates = numberRates;
            tab.type = type;
            tab.source = source;
            tab.url = url;
            tab.capo = capo;
            tab.difficulty = difficulty;
            tab.tonality = tonality;
            tab.tuning = tuning;
            tab.hash = content.hashCode();
            tab.persist();
        }
        else
        {
            log.debug("Not Adding {} - {}. Reason: Duplicate of existing tab.", artist, name);
        }
    }

    private boolean isContentUnique(String artist, String title, String content)
    {
        int hash = content.hashCode();
        List<Tab> matches = Tab.list("hash", hash);
        for (Tab match : matches)
            if (match.content.equals(content))
            {
                log.debug("Incoming tab '{} - {}' has same content as existing tab '{} - {}'", artist, title, match.artist, match.name);
                return false;
            }
            else
                log.debug("Incoming tab '{} - {}' has a hash collision, but different content, compared to existing tab '{} - {}'",
                        artist, title, match.artist, match.name);

        return true;
    }
}
