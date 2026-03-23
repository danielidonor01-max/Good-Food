import { client } from './client';

// Fetch Combos
export async function getCombos() {
  try {
    const combos = await client.fetch(`*[_type == "combo" && is_active != false] {
      ...,
      "image": image.asset->url
    } | order(_createdAt asc)`);
    return combos || [];
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return [];
  }
}

// Fetch Promos
export async function getPromos() {
  try {
    const promos = await client.fetch(`*[_type == "promo" && is_active != false] {
      ...,
      "image": image.asset->url
    } | order(_createdAt asc)`);
    return promos || [];
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return [];
  }
}

// Fetch Categories
export async function getCategories() {
  try {
    const categories = await client.fetch(`*[_type == "category"] | order(order asc)`);
    return categories || [];
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return [];
  }
}

// Fetch Menu Items
export async function getMenuItems() {
  try {
    const items = await client.fetch(`*[_type == "menuItem" && is_available != false] {
      ...,
      "image": image.asset->url
    } | order(_createdAt asc)`);
    return items || [];
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return [];
  }
}

// Fetch Global Settings
export async function getSettings() {
  try {
    const settings = await client.fetch(`*[_type == "settings"][0]`);
    return settings || null;
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}

export async function getRestaurant() {
  return {
    name: "Buka Delight",
    description: "Authentic, energetic Nigerian cuisine delivered hot and fresh."
  };
}
