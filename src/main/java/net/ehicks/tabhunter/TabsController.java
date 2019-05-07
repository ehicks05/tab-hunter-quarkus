//package net.ehicks.tabhunter;
//
//import java.io.IOException;
//
//public class TabsController
//{
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
//}
