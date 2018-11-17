var main = {
    area: null,
    areas: [
        {
            display: "Shop",
            internal: "shop"
        },
        {
            display: "Lake",
            internal: "lake"
        },
        {
            display: "River",
            internal: "river"
        },
        {
            display: "Pier",
            internal: "pier"
        },
        {
            display: "Reef",
            internal: "reef"
        },
        {
            display: "Spear Fishing",
            internal: "spear_fishing"
        },
        {
            display: "Deep Sea",
            internal: "deep_sea"
        }
    ],

    initialize(interval) {
        counters.initialize();
        this.initialize_locations();

        messenger.initialize();
        lake.initialize();

        window.setInterval(function() {
            main.update();
        }, interval);
    },

    update() {
        this.area.update();
        counters.update();
    },

    switch_area(area) {
        let children = $("#area_selector")
            .children();
        for (let index = 0; index < children.length; index++) {
            $(children[index])
                .prop("disabled", false);
        }

        $("#" + area.internal + "_button")
            .prop("disabled", true);

        if (this.area != null) {
            this.area.unload();
        }

        this.area = area;
    },

    initialize_locations() {
        for (let index = 0; index < this.areas.length; index++) {
            let item = this.areas[index];

            button.create({
                parent: "area_selector",
                id: item.internal,
                text: item.display,
                hide: true,
                on_click: function() {
                    $("#resource_buttons")
                        .empty();

                    window[item.internal].initialize();
                }
            });
        }
    },

    show_about() {
        let overlay = $("<div>")
            .attr("id", "overlay")
            .appendTo($("body"));
        let popup = $("<div>")
            .attr("id", "about")
            .appendTo(overlay);
        let text = $.parseHTML("Fishing Enterprises was developed solely by me, Josh Sperry, in my "
            + "free time to scratch the itch of an expansive idle game. It is heavily inspired by "
            + "<a class='link' target='_blank' href='https://candybox2.github.io/candybox/'>Candybox 1</a>, "
            + "<a class='link' target='_blank' href='https://candybox2.github.io/'>Candybox 2</a>, "
            + "<a class='link' target='_blank' href='http://adarkroom.doublespeakgames.com/'>A Dark Room</a> and "
            + "<a class='link' target='_blank' href='http://www.decisionproblem.com/paperclips/'>Universal Paperclips</a>.<br><br>"
            + "The majority of the source code is written in "
            + "<a class='link' target='_blank' href='https://www.javascript.com/'>Javascript</a> with "
            + "<a class='link' target='_blank' href='https://jquery.com/'>jQuery</a> "
            + "and is freely avaliable to view on "
            + "<a class='link' target='_blank' href='https://github.com/mrsperry/mrsperry.github.io'>my Github</a>.");
        let content = $("<p>")
            .appendTo(popup);
        $(text)
            .appendTo(content);
        button.create({
            parent: "about",
            id: "close",
            text: "Close",
            breaks: 0,
            on_click: function() {
                $(overlay)
                    .remove();
            }
        });
    },

    remove(id) {
        $("#" + id + "_button")
            .fadeOut(400, (function() {
                $("#" + id + "_button")
                    .remove();
            }));
    },

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Fisher-Yates shuffle
    shuffle(array) {
        let counter = array.length;
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);

            counter--;

            let current = array[counter];
            array[counter] = array[index];
            array[index] = current;
        }

        return array;
    }
}