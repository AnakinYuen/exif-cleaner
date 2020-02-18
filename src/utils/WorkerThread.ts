import ThreadPool from './ThreadPool';

export interface WorkerTask {
  file: File;
  callback: (event: MessageEvent) => void;
}

class WorkerThread {
  private parentPool: ThreadPool;
  private workerTask: WorkerTask;
  private worker: Worker;

  public constructor(pool: ThreadPool) {
    this.parentPool = pool;
    this.worker = new Worker('./imageToBlob.ts');
  }

  public run(workerTask: WorkerTask) {
    this.workerTask = workerTask;
    this.worker.addEventListener('message', this.dummyCallback, false);
    this.worker.postMessage(workerTask.file);
  }

  private dummyCallback = (event: MessageEvent) => {
    // pass to original callback
    this.workerTask.callback(event);

    // we should use a separate thread to add the worker
    this.parentPool.freeWorkerThread(this);
  };
}

export default WorkerThread;
