"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function page() {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttraction() {
      const res = await fetch(`/api/attractions/${id}`);
      if (res.ok) {
        const data = await res.json();
        setAttraction(data);
      }
      setLoading(false);
    }
    fetchAttraction();
  }, [])

  if (loading) return <div>Loading...</div>
  if (!attraction) return <div>Not found.</div>

  return (
    <div>
      <h1>{attraction.name}</h1>
      <img src={attraction.coverimage} />
      <p>{attraction.detail}</p>
      <p>Latitute: {attraction.latitude}</p>
      <p>Longitude: {attraction.longitude}</p>
      <a href='/attractions'>Back</a>
    </div>
    );
}