package net.ehicks.tabhunter;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import java.util.Date;

@Entity
public class Tab extends PanacheEntity
{
    public int hash = 0;
    public String artist = "";
    public String name = "";
    public String content = "";
    public int numberRates = 0;
    public double rating = 0F;
    public String type = "";
    public String tuning = "";
    public String source = "";
    public String difficulty = "";
    public String capo = "";
    public String tonality = "";
    public String url = "";
    public Long authorId = 0L;
    public int views = 0;
    public Date createdOn = new Date();

    public static Tab findByHash(int hash)
    {
        return find("hash", hash).firstResult();
    }
}

/*
    create table tab (
        hash         int       NOT null,
        artist       text      NOT null,
        name         text      NOT null,
        content      text      NOT null,
        number_rates int       NOT null default 0,
        rating       float     NOT null default 0,
        type         text      NOT null,
        tuning       text,
        source       text,
        difficulty   text,
        capo         text,
        tonality     text,
        url          text,
        author_id    bigint    NOT null default 0,
        views        int       NOT null default 0,
        created_on   timestamp NOT null default CURRENT_TIMESTAMP,
        primary key (hash)
);
*/