#include <stdio.h>
#include <stdlib.h>

// Node structure for Linked List, Stack, and Queue
struct Node {
    int data;
    struct Node* next;
};

// Linked List Operations
struct Node* head = NULL;
void insertLinkedList(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = head;
    head = newNode;
}
void displayLinkedList() {
    struct Node* temp = head;
    while (temp) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

// Stack Operations
struct Node* top = NULL;
void push(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = top;
    top = newNode;
}
void pop() {
    if (!top) {
        printf("Stack Underflow\n");
        return;
    }
    struct Node* temp = top;
    top = top->next;
    free(temp);
}
void displayStack() {
    struct Node* temp = top;
    while (temp) {
        printf("%d\n", temp->data);
        temp = temp->next;
    }
}

// Queue Operations
struct Node* front = NULL;
struct Node* rear = NULL;
void enqueue(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;
    if (!rear) {
        front = rear = newNode;
        return;
    }
    rear->next = newNode;
    rear = newNode;
}
void dequeue() {
    if (!front) {
        printf("Queue Underflow\n");
        return;
    }
    struct Node* temp = front;
    front = front->next;
    if (!front) rear = NULL;
    free(temp);
}
void displayQueue() {
    struct Node* temp = front;
    while (temp) {
        printf("%d <- ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

// Main Function to test the structures
int main() {
    // Linked List Test
    printf("Linked List Operations:\n");
    insertLinkedList(10);
    insertLinkedList(20);
    insertLinkedList(30);
    displayLinkedList();

    // Stack Test
    printf("\nStack Operations:\n");
    push(5);
    push(15);
    push(25);
    displayStack();
    pop();
    displayStack();

    // Queue Test
    printf("\nQueue Operations:\n");
    enqueue(1);
    enqueue(2);
    enqueue(3);
    displayQueue();
    dequeue();
    displayQueue();

    return 0;
}
