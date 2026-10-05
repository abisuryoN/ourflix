import React from 'react';
import MemoryRow from './MemoryRow';

export default function ContinueWatching({ memories }) {
  // Only photos strictly from the continueWaatching folder
  const watchingMemories = memories.filter(m => m.category === 'Continue Watching');
  
  if (watchingMemories.length === 0) return null;

  return (
    <MemoryRow
      title="Continue Watching"
      subtitle="Pick up where we left off in our journey"
      memories={watchingMemories}
      showProgress={true}
      badge="In Progress"
    />
  );
}
