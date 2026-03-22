import { client } from './client';
import fallbackData from '../data/menu.json';

// Fetch Combos
export async function getCombos() {
  try {
    const combos = await client.fetch(`*[_type == "combo" && is_active == true] | order(_createdAt asc)`);
    if (combos && combos.length > 0) return combos;
    return fallbackData.combos || [];
  } catch (error) {
    console.error("Sanity fetch failed, using fallback combos:", error);
    return fallbackData.combos || [];
  }
}

// Fetch Promos
export async function getPromos() {
  try {
    const promos = await client.fetch(`*[_type == "promo" && is_active == true] | order(_createdAt asc)`);
    if (promos && promos.length > 0) return promos;
    return fallbackData.promos || [];
  } catch (error) {
    console.error("Sanity fetch failed, using fallback promos:", error);
    return fallbackData.promos || [];
  }
}

// Fetch Categories
export async function getCategories() {
  try {
    const categories = await client.fetch(`*[_type == "category"] | order(order asc)`);
    if (categories && categories.length > 0) return categories;
    return fallbackData.categories || [];
  } catch (error) {
    console.error("Sanity fetch failed, using fallback categories:", error);
    return fallbackData.categories || [];
  }
}

// Fetch Menu Items
export async function getMenuItems() {
  try {
    const items = await client.fetch(`*[_type == "menuItem" && is_available == true] | order(_createdAt asc)`);
    if (items && items.length > 0) return items;
    return fallbackData.items || [];
  } catch (error) {
    console.error("Sanity fetch failed, using fallback items:", error);
    return fallbackData.items || [];
  }
}

// Fetch Global Settings
export async function getSettings() {
  try {
    const settings = await client.fetch(`*[_type == "settings"][0]`);
    if (settings) return settings;
    return null;
  } catch (error) {
    console.error("Sanity fetch failed, no fallback globals:", error);
    return null;
  }
}

export async function getRestaurant() {
  return fallbackData.restaurant;
}
