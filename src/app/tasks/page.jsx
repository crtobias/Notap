"use client"
import Link from 'next/link';
import styles from '../../styles/task.module.css';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [tasks, setTasks] = useState([]);

  const { data: session } = useSession(); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        
        if (session) {
          const userId = session.user._id; // Accedemos a session.user._id
          const response = await axios.get(`http://localhost:3000/api/usertasks/${userId}`);
          console.log(response.data);
          setTasks(response.data)
        }
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };

    fetchTasks();
  }, [session]); 

  

  return (
    <div className={styles.allcontainer}>
      <h1 className={styles.title}>MY NOTES</h1>
      <Link href="/tasks/new">
        <button className={styles.button}>ADD NOTE+</button>
      </Link>
      <section className={styles.containernote}>

      {tasks.map(task => (
        <Link href={`/tasks/${task._id}`}>
          <div key={task._id} className={styles.card}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        </Link>
      ))}

      </section>
    </div>
  );
}


