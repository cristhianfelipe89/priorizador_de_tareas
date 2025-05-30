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

    insert(element) {
        if (this.size >= this.maxSize) {
            console.warn("Heap is full");
            return;
        }

        this.heap[this.size] = element;
        let current = this.size;

        while (
            current > 0 &&
            this.heap[current] < this.heap[this.parentIndex(current)]
        ) {
            this.swap(current, this.parentIndex(current));
            current = this.parentIndex(current);
        }

        this.size++;
    }

    extractMin() {
        if (this.size <= 0) return Number.NEGATIVE_INFINITY;

        const popped = this.heap[0];
        this.heap[0] = this.heap[this.size - 1];
        this.size--;
        this.minHeapify(0);
        return popped;
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

function insertRandomNumbersToHeap(heap, n, max = 100) {
    console.log(`Insertando ${n} números aleatorios en el heap:\n`);

    for (let i = 0; i < n; i++) {
        const num = Math.floor(Math.random() * max); // Número entre 0 y max-1
        console.log(`Insertando: ${num}`);
        heap.insert(num);
    }

    console.log("\n ---- Representación del heap: ----");
    heap.printHeapPretty();

    console.log("\n ---- Heap como arreglo: ----");
    heap.printHeap();

    console.log("\n ---- Extraer mínimo: ----");
    console.log("Min:", heap.extractMin());

    console.log("\n ---- Heap después de extraer mínimo: ----");
    heap.printHeap();
}

const heap = new MinHeap(50); // tamaño máximo arbitrario
insertRandomNumbersToHeap(heap, 20); // inserta 20 números aleatorios