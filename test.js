const alibay = require('./alibay');

async function test() {
    await alibay.initPermanentStorage();
    let sellerID = alibay.genUID();
    let buyerID = alibay.genUID();

    await alibay.initializeUserIfNeeded(sellerID)
    await alibay.initializeUserIfNeeded(buyerID)

    let listing1ID = await alibay.createListing(sellerID, 500000, "A very nice boat")
    let listing2ID = await alibay.createListing(sellerID, 1000, "Faux fur gloves")
    let listing3ID = await alibay.createListing(sellerID, 100, "Running shoes")
    let product2Description =  alibay.getItemDescription(listing2ID)

    await buy(buyerID, sellerID, listing2ID)
    await buy(buyerID, sellerID, listing3ID)

    let allSold = alibay.allItemsSold(sellerID)
    let soldDescriptions = allSold.map(alibay.getItemDescription)
    let allBought = alibay.allItemsBought(buyerID)
    let allBoughtDescriptions = allBought.map(getItemDescription)
    let listings =  allListings()
    let boatListings = searchForListings("boat")
    let shoeListings = searchForListings("shoes")
    let boatDescription = getItemDescription(listings[0])
    let boatBlurb = boatDescription.blurb;
    let boatPrice = boatDescription.price;
    assert(allSold.length == 2); // The seller has sold 2 items
    assert(allBought.length == 2); // The buyer has bought 2 items
    assert(listings.length == 1); // Only the boat is still on sale
    assert(boatListings.length == 1); // The boat hasn't been sold yet
    assert(shoeListings.length == 0); // The shoes have been sold
    assert(boatBlurb == "A very nice boat");
    assert(boatPrice == 500000);
}
test();