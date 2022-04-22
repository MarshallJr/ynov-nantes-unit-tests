const {Shop, Item} = require("../src/gilded_rose");
const {items} = require("../src/constants");

describe("Gilded Rose", function() {

  describe("Item creation", function () {

    it("basic creation", function () {
      const item = new Item("foo", 10, 10)
      expect(item.name).toBe("foo");
    });

    it("legendary creation", function () {
      const legendary = new Item("Sulfuras, Hand of Ragnaros", null, 10)
      expect(legendary.name).toBe("Sulfuras, Hand of Ragnaros");
    });

    it("basic creation without quality", function () {
      expect(() => {
        new Item("foo", 10, null);
      }).toThrow();
    });

    it("legendary creation without quality", function () {
      const legendary = new Item("Sulfuras, Hand of Ragnaros", null, null)
      expect(legendary.name).toBe("Sulfuras, Hand of Ragnaros");
    });

    it("basic creation without sellIn", function () {
      expect(() => {
        new Item("foo", null, 12);
      }).toThrow();
    });

    it("legendary creation without sellIn", function () {
      const legendary = new Item("Sulfuras, Hand of Ragnaros", null, 10)
      expect(legendary.name).toBe("Sulfuras, Hand of Ragnaros");
    });

    it("basic creation quality = 0", function () {
      const item = new Item("foo", 10, 0)
      expect(item.name).toBe("foo");
    });

    it("basic creation quality < 0", function () {
      expect(() => {
        new Item("foo", 10, -2)
      }).toThrow();
    });

    it("basic creation quality = 50", function () {
      const item = new Item("foo", 10, 50)
      expect(item.name).toBe("foo");
    });

    it("basic creation quality > 50", function () {
      expect(() => {
        new Item("foo", 10, 60)
      }).toThrow();
    });

    it("legendary creation quality > 50", function () {
      const legendary = new Item("Sulfuras, Hand of Ragnaros", null, 80)
      expect(legendary.name).toBe("Sulfuras, Hand of Ragnaros");
    });

  });

  describe("Shop updateQuality", function () {

    let gildedRose;

    beforeAll(function () {
      gildedRose = new Shop();
    });

    describe("sellIn > 0", function () {

      describe("basic item", function () {
        it("basic updateQuality", function() {
          gildedRose.setItems([new Item("foo", 10, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].sellIn).toBe(9);
          expect(items[0].quality).toBe(19);
        });

        it("basic updateQuality with quality 0", function() {
          gildedRose.setItems([new Item("foo", 10, 0)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(0);
        });
      });

      describe("aged brie", function () {
        it("Aged brie updateQuality", function() {
          gildedRose.setItems([new Item("Aged Brie", 10, 22)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(23);
        });

        it("Aged brie updateQuality with quality 50", function() {
          gildedRose.setItems([new Item("Aged Brie", 10, 50)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(50);
        });
      });

      describe("Backstage passes", function () {
        it("with quality 50", function() {
          gildedRose.setItems([new Item("Backstage passes to a TAFKAL80ETC concert", 2, 50)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(50);
        });

        it("with sellIn > 10", function() {
          gildedRose.setItems([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 12)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(13);
        });

        it("with 10 >= sellIn > 5", function() {
          gildedRose.setItems([new Item("Backstage passes to a TAFKAL80ETC concert", 7, 12)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(14);
        });

        it("with 5 >= sellIn > 0", function() {
          gildedRose.setItems([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 12)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(15);
        });
      })

      it("legendary item", function() {
        gildedRose.setItems([new Item("Sulfuras, Hand of Ragnaros", null, 25)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(80);
      });
    });

    describe("sellIn = 0", function () {

      describe("basic item", function () {
        it("basic updateQuality", function() {
          gildedRose.setItems([new Item("foo", 0, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].sellIn).toBe(-1);
          expect(items[0].quality).toBe(19);
        });

        it("basic updateQuality with quality 0", function() {
          gildedRose.setItems([new Item("foo", 0, 0)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(0);
        });
      });

      describe("aged brie", function () {
        it("Aged brie updateQuality", function() {
          gildedRose.setItems([new Item("Aged Brie", 0, 22)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(23);
        });

        it("Aged brie updateQuality with quality 50", function() {
          gildedRose.setItems([new Item("Aged Brie", 0, 50)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(50);
        });
      });

      describe("Backstage passes", function () {
        it("after the concert", function() {
          gildedRose.setItems([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 12)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(0);
        });
      })

      it("legendary item", function() {
        gildedRose.setItems([new Item("Sulfuras, Hand of Ragnaros", null, 25)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(80);
      });
    });

    describe("sellIn < 0", function () {

      describe("basic item", function () {
        it("basic updateQuality", function() {
          gildedRose.setItems([new Item("foo", -3, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].sellIn).toBe(-4);
          expect(items[0].quality).toBe(18);
        });

        it("basic updateQuality with quality 0", function() {
          gildedRose.setItems([new Item("foo", -3, 0)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(0);
        });
      });

      describe("aged brie", function () {
        it("Aged brie updateQuality", function() {
          gildedRose.setItems([new Item("Aged Brie", -3, 22)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(20);
        });

        it("Aged brie updateQuality with quality 0", function() {
          gildedRose.setItems([new Item("Aged Brie", -3, 0)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(0);
        });
      });

      describe("Backstage passes", function () {
        it("after the concert", function() {
          gildedRose.setItems([new Item("Backstage passes to a TAFKAL80ETC concert", -3, 12)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(0);
        });
      })

      it("legendary item", function() {
        gildedRose.setItems([new Item("Sulfuras, Hand of Ragnaros", null, 25)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(80);
      });

      describe("conjured items", function () {
        it("basic", function() {
          gildedRose.setItems([new Item("Conjured Mana Cake", -3, 6)]);
          const items = gildedRose.updateQuality();
          expect(items[0].sellIn).toBe(-4);
          expect(items[0].quality).toBe(2);
        });

        it("with quality near to 0", function() {
          gildedRose.setItems([new Item("Conjured Mana Cake", -3, 3)]);
          const items = gildedRose.updateQuality();
          expect(items[0].sellIn).toBe(-4);
          expect(items[0].quality).toBe(0);
        });
      })
    });
  });

});
