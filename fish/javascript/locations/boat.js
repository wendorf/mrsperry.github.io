var boat = {
    parts: {
        hull: {
            display: "Hull",
            price: 500,
        },
        cabin: {
            display: "Cabin",
            price: 250,
        },
        engine: {
            display: "Engine",
            price: 350,
        },
        anchor: {
            display: "Anchor",
            price: 150,
        }
    },

    initialize() {
        $("<div>")
            .attr("id", "boat_counters")
            .attr("display", "Boat")
            .addClass("before")
            .addClass("counter")
            .fadeIn()
            .appendTo($("#boat_info"));
        $(counters.create_counter(resources.fuel, "boat_counters"))
            .fadeIn();

        for (let name in this.parts) {
            let item = this.parts[name];
            let id = "boat_" + name;

            shop.buttons[id] = {
                data: {
                    parent: "misc_section",
                    id: id,
                    text: item.display + " ($" + item.price + ")",
                    on_click: function() {
                        boat.purchase_part(item);
                        shop.remove_item(id);
                    },
                    disabled: function() {
                        return resources.money.count < item.price;
                    }
                }
            }
        }
    },

    purchase_part(item) {
        item.purchased = true;
        shop.update_money(-item.price);

        let parent = $("#boat_counters");
        if ($(parent)
            .children().length == 1) {
            $("<div>")
                .addClass("counter_break")
                .hide()
                .fadeIn()
                .appendTo(parent);
        }

        $("<div>")
            .text(item.display)
            .addClass("value")
            .hide()
            .fadeIn()
            .appendTo(parent);

        for (let id in this.parts) {
            if (this.parts[id].purchased == null) {
                return;
            }
        }

        reef.purchase();
    }
}