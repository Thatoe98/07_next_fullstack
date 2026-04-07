"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function page() {
  const { id } = useParams();
  const router = useRouter();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAttraction() {
      const res = await fetch(`/api/attractions/${id}`);
      if (res.ok) {
        const data = await res.json();
        setAttraction(data);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || "Failed to fetch attraction.");
      }
      setLoading(false);
    }
    fetchAttraction();
  }, [id])

  async function onDelete() {
    if (!confirm("Are you sure you want to delete this attraction?")) return;
    setDeleting(true);setError("");
    try {
      const res = await fetch(`/api/attractions/${id}`, { method: "DELETE" });
      const data =await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to delete attraction.");
        router.push('/attractions');
      
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <div>Loading...</div>
  if (!attraction) return <div>Not found.</div>

  return (
    <div>
      <h1>{attraction.name}</h1>
      <img src={attraction.coverimage} />
      <p>{attraction.detail}</p>
      <p>Latitute: {attraction.latitude}</p>
      <p>Longitude: {attraction.longitude}</p>
      <div style = {{display: "flex", gap: 12, marginTop:12}} >
        <Link href= {`/attractions/${id}/edit`}>Edit</Link>
        <button onClick={onDelete} disabled={deleting}>{deleting ? "Deleting..." : "Delete"}</button>
        <Link href='/attractions'>Back</Link>
      </div>
      {error && <p style={{color: "red"}}>{error}</p>}
    </div>
    );
}