const dummyProducts = [
  {
    title: "Kanecraft Premium Letterheads",
    description: "Elegant, crisp, and sustainable. Our bagasse letterheads ensure your corporate communications make the right impression, both professionally and environmentally.",
    price: 35.00,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop",
    esgStats: [
      "100% Recyclable and Compostable",
      "Chlorine-free processing",
      "Enhances Corporate ESG Ratings"
    ]
  },
  {
    title: "Eco-Mailer Bags (100 Pcs)",
    description: "Water-resistant, durable shipping bags made from upcycled agricultural fiber. A perfect alternative to single-use plastic poly mailers.",
    price: 42.50,
    category: "Packaging",
    image: "https://images.unsplash.com/photo-1622322305886-f4043b275217?q=80&w=1000&auto=format&fit=crop",
    esgStats: [
      "Biodegrades in 180 days",
      "Tear-resistant natural fibers",
      "Saves approx. 5kg of plastic per pack"
    ]
  },
  {
    title: "Kanecraft Sketch & Art Pad",
    description: "Heavyweight 150gsm bagasse paper ideal for pencils, charcoal, and light watercolors. Loved by artists who care about the planet.",
    price: 12.99,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop",
    esgStats: [
      "Acid-free for archival longevity",
      "Supports sustainable farming",
      "Zero deforestation"
    ]
  },
  {
    title: "Sustainable Business Envelopes (Box of 500)",
    description: "Standard DL business envelopes with a peel-and-seal flap. Crafted from our signature tree-free paper for eco-conscious mailings.",
    price: 28.00,
    category: "Office Supplies",
    image: "https://images.unsplash.com/photo-1574635677864-4e9e432d60b5?q=80&w=1000&auto=format&fit=crop",
    esgStats: [
      "Non-toxic, plant-based adhesive",
      "100% Tree-Free",
      "Lower carbon emissions in manufacturing"
    ]
  }
];

async function run() {
  console.log("Authenticating as admin...");

  // 1. Authenticate to get the cookie
  let cookie = "";
  try {
    const loginRes = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "admin123" }) // Using the password from your .env.local
    });

    if (!loginRes.ok) {
      throw new Error("Failed to authenticate. Is the password correct?");
    }

    // Extract the Set-Cookie header
    const setCookieHeader = loginRes.headers.get("set-cookie");
    if (setCookieHeader) {
      // Very basic cookie parsing for node fetch
      cookie = setCookieHeader.split(';')[0];
    }
    console.log("✅ Authenticated successfully!");
  } catch (err) {
    console.error("❌ Auth Error:", err.message);
    return;
  }

  console.log("Starting to insert dummy products...");

  // 2. Insert products with the auth cookie
  for (const product of dummyProducts) {
    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookie
        },
        body: JSON.stringify(product)
      });

      if (res.ok) {
        console.log(`✅ Successfully added: ${product.title}`);
      } else {
        const err = await res.text();
        console.error(`❌ Failed to add ${product.title}: ${err}`);
      }
    } catch (error) {
      console.error(`❌ Network error while adding ${product.title}:`, error);
    }
  }

  console.log("Finished!");
}

run();
