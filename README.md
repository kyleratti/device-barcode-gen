# device-barcode-gen
This is a fully clientside web application designed during my employment at Express Stores LLC out of pure frustration.

## The Problem
Part of our responsibilities included scanning each mobile device into our inventory tracking system each day. Easy enough with a barcode scanner - until you get to the Apple devices and realize all of their barcodes are on the bottom of the box.

You only have to pull out every single iPhone, scan it, and put it back into the safe about 3 times before you realize the insanity of the situation and want a better solution.

## The First Solution
In the past, other stores used free online barcode generators. That works, but not great, and here's why:

1. The free barcode generator sites they were using didn't support bulk barcodes
2. The barcodes weren't labeled (or if they were, you had to manually type in the label each time)
3. Even if the barcodes were labeled, they were hard to distinguish when searching for a specific color/memory size

This solution had too many problems to work for me.

## The Final Solution
Enter this barcode generator, built with the [jQuery barcode generator library](http://barcode-coder.com/en/), [Twitter's Bootstrap](https://getbootstrap.com), and the [Cosmo theme from Bootswatch](https://bootswatch.com/). It's a rather straight-forward application that lets you scan the SKU of a device followed by the IMEI. It takes care of the formatting automatically and generates an easy-to-read barcode:

![Generated barcode example](https://i.imgur.com/20462m6.png)
