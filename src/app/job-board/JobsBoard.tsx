'use client';
import React, { useEffect, useState } from 'react';

type Job = {
  id: number;
  title: string;
  by: string;
  url: string;
};
export default function JobsBoard() {
  const [jobIds, setJobsIds] = useState<number[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState<number[]>([0, 6]);

  const handleLoadMore = () => {
    setPage((prevPage) => {
      return [prevPage[0] + 6, prevPage[1] + 6];
    });
  };
  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch(
        'https://hacker-news.firebaseio.com/v0/jobstories.json'
      );
      const data = await res.json();
      setJobsIds(data);
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchNewJobs = async () => {
      const [start, end] = page;
      const jobPromises = jobIds.slice(start, end).map((id) => {
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((res) => res.json())
          .then((data) => {
            return data;
          });
      });
      const newJobs = await Promise.all(jobPromises);
      setJobs(newJobs);
    };
    fetchNewJobs();
  }, [jobIds, page]);

  console.log(jobs);
  return (
    <div>
      <h1>Jobs Board</h1>

      {jobs?.map((job: Job) => {
        return (
          <div key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.by}</p>
            <p>{job.url}</p>
          </div>
        );
      })}

      {jobs.length > 0 && (
        <button onClick={handleLoadMore}>Load More Jobs</button>
      )}
    </div>
  );
}
