package edu.cornell.betterapp.dummy;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Helper class for providing sample content for user interfaces created by
 * Android template wizards.
 * <p>
 * TODO: Replace all uses of this class before publishing your app.
 */
public class DummyContent {

    /**
     * An array of sample (dummy) items.
     */
    public static final List<DummyItem> ITEMS = new ArrayList<DummyItem>();


    private static final int COUNT = 25;

    static {
        // Add some sample items.
        //for (int i = 1; i <= COUNT; i++) {
        //    addItem(createDummyItem(i));
        //}
    }

    public static void addItem(DummyItem item) {

    }

    public static void createDummyItem() {
        String timeStamp = new SimpleDateFormat("MM/dd/yyyy").format(new Date());
        DummyItem item = new DummyItem("Bank of Cornell Tech", "Date Opened: " + timeStamp,"");
        ITEMS.add(item);
    }

    /**
     * A dummy item representing a piece of content.
     */
    public static class DummyItem {
        public final String id;
        public final String content;
        public final String details;

        public DummyItem(String institutionName, String content, String details) {
            this.id = institutionName;
            this.content = content;
            this.details = details;
        }

        @Override
        public String toString() {
            return content;
        }
    }
}
