"use client";  // Mark this as a Client Component

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from API when the component mounts
    const fetchData = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=20');
      setItems(response.data);
    };
    fetchData();
  }, []);

  // Filter items based on the search term
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Item List</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by title"
        className="border p-2 mb-4 w-full"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display items in a grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <Link key={item.id} href={`/item/${item.id}`}>
            <div className="border p-4 rounded-md hover:shadow-lg cursor-pointer">
              <img src={item.thumbnailUrl} alt={item.title} className="w-full h-32 object-cover mb-2" />
              <h2 className="font-bold text-lg">{item.title}</h2>
              <p>{item.description || 'No description available.'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
