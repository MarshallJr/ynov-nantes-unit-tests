Feature: Item

Scenario: sellIn should decrease:
    Given I have an Item:
    | Name                  | SellIn | Quality |
    | Un weekend de 3 jours |     11 |      20 |
    | Le dernier Iphone     |     10 |     800 |
    When a day pass
    Then my item should be like:
    | Name                  | SellIn | Quality |
    | Un weekend de 3 jours |     10 |      19 |
    | Le dernier Iphone     |      9 |     799 |
