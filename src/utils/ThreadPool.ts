import WorkerThread, { WorkerTask } from './WorkerThread';

/**
 * inspired by [this post](http://www.smartjava.org/content/html5-easily-parallelize-jobs-using-web-workers-and-threadpool/)
 */
class ThreadPool {
  private taskQueue: WorkerTask[] = [];
  private workerQueue: WorkerThread[] = [];
  private size: number;

  public constructor(size: number) {
    this.size = size;
  }

  public init() {
    for (let i = 0; i < this.size; i++) {
      this.workerQueue.push(new WorkerThread(this));
    }
  }

  public addWorkerTask(workerTask: WorkerTask) {
    if (this.workerQueue.length > 0) {
      const workerThread = this.workerQueue.shift();
      workerThread.run(workerTask);
    } else {
      this.taskQueue.push(workerTask);
    }
  }

  public freeWorkerThread(workerThread: WorkerThread) {
    if (this.taskQueue.length > 0) {
      const workerTask = this.taskQueue.shift();
      workerThread.run(workerTask);
    } else {
      this.workerQueue.push(workerThread);
    }
  }
}

export default ThreadPool;
