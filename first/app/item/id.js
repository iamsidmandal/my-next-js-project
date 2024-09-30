import axios from 'axios';

export default async function ItemDetail({ params }) {
  const { id } = params;
  const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
  const item = response.data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
      <img src={item.url} alt={item.title} className="w-full h-64 object-cover mb-4" />
      <p>{item.description || 'No description available.'}</p>
    </div>
  );
}
