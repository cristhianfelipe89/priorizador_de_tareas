// MinHeap adaptado a tareas con prioridad
class MinHeap {
    constructor(maxSize) {
        this.heap = new Array(maxSize);
        this.size = 0;
        this.maxSize = maxSize;
    }

    parentIndex(i) {
        return Math.floor((i - 1) / 2);
    }

    leftChildIndex(i) {
        return 2 * i + 1;
    }

    rightChildIndex(i) {
        return 2 * i + 2;
    }

    isLeaf(i) {
        return (
            this.leftChildIndex(i) >= this.size &&
            this.rightChildIndex(i) >= this.size
        );
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(task) {
        if (this.size >= this.maxSize) {
            console.warn("Heap is full");
            return;
        }

        this.heap[this.size] = task;
        let current = this.size;

        while (
            current > 0 &&
            this.heap[current].priority < this.heap[this.parentIndex(current)].priority
        ) {
            this.swap(current, this.parentIndex(current));
            current = this.parentIndex(current);
        }

        this.size++;
    }

    extractMin() {
        if (this.size <= 0) return null;

        const minTask = this.heap[0];
        this.heap[0] = this.heap[this.size - 1];
        this.size--;
        this.minHeapify(0);
        return minTask;
    }

    minHeapify(i) {
        if (!this.isLeaf(i)) {
            const left = this.leftChildIndex(i);
            const right = this.rightChildIndex(i);

            let smallest = i;

            if (left < this.size && this.heap[left].priority < this.heap[smallest].priority) {
                smallest = left;
            }

            if (right < this.size && this.heap[right].priority < this.heap[smallest].priority) {
                smallest = right;
            }

            if (smallest !== i) {
                this.swap(i, smallest);
                this.minHeapify(smallest);
            }
        }
    }

    printHeap() {
        console.log("Estado actual del heap:");
        for (let i = 0; i < this.size; i++) {
            console.log(`Tarea: ${this.heap[i].name}, Prioridad: ${this.heap[i].priority}`);
        }
    }

    extractAllSorted() {
        const result = [];
        while (this.size > 0) {
            result.push(this.extractMin());
        }
        return result;
    }
}

// Ejemplo de uso
const heap = new MinHeap(10);

heap.insert({ name: "Estudiar para examen", priority: 1 });
heap.insert({ name: "Hacer mercado", priority: 2 });
heap.insert({ name: "Terminar el curso del SENA", priority: 4 });
heap.insert({ name: "Sacar al perro", priority: 3 });

heap.printHeap();

console.log("\nTarea más prioritaria extraída:");
const minTask = heap.extractMin();
console.log(`Tarea: ${minTask.name}, Prioridad: ${minTask.priority}`);

console.log("\nHeap después de extracción:");
heap.printHeap();

console.log("\nListado ordenado de tareas:");
const sortedTasks = heap.extractAllSorted();
sortedTasks.forEach(task => {
    console.log(`Tarea: ${task.name}, Prioridad: ${task.priority}`);
});
