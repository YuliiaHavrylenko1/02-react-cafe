import React, { useState } from 'react';
import css from './App.module.css';

import CafeInfo from '../CafeInfo-1/CafeInfo';
import VoteOptions from '../VoteOptions-3/VoteOptions';
import VoteStats from '../VoteStats-4/VoteStats';
import Notification from '../Notification-2/Notification';

import type { Votes, VoteType } from '../../types/votes';

const App: React.FC = () => {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  // Обробник голосування
  const handleVote = (type: VoteType) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  // Скидання голосів
  const resetVotes = () => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />

      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />

      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
};

export default App;