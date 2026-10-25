// Package main is a Go sample for checking theme colors.
package main

import (
	"errors"
	"fmt"
	"regexp"
	"sort"
	"strings"
	"sync"
)

const (
	MaxWorkers = 4
	Version    = "1.2.3"
)

var ErrNotFound = errors.New("user not found")

var namePattern = regexp.MustCompile(`^[A-Za-z][A-Za-z0-9_]{2,15}$`)

// User represents an account in the store.
type User struct {
	ID     int      `json:"id"`
	Name   string   `json:"name"`
	Active bool     `json:"active"`
	Roles  []string `json:"roles,omitempty"`
}

type Store interface {
	Get(id int) (*User, error)
	Put(u *User) error
}

type memoryStore struct {
	mu    sync.RWMutex
	users map[int]*User
}

func NewMemoryStore() *memoryStore {
	return &memoryStore{users: make(map[int]*User)}
}

func (s *memoryStore) Get(id int) (*User, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	if u, ok := s.users[id]; ok {
		return u, nil
	}
	return nil, fmt.Errorf("get %d: %w", id, ErrNotFound)
}

func (s *memoryStore) Put(u *User) error {
	if !namePattern.MatchString(u.Name) {
		return fmt.Errorf("invalid name %q", u.Name)
	}
	s.mu.Lock()
	s.users[u.ID] = u
	s.mu.Unlock()
	return nil
}

func main() {
	store := NewMemoryStore()
	names := []string{"alice", "bob", "carol", "x"}

	var wg sync.WaitGroup
	for i, name := range names {
		wg.Add(1)
		go func(id int, n string) {
			defer wg.Done()
			if err := store.Put(&User{ID: id, Name: n, Active: id%2 == 0}); err != nil {
				fmt.Println("error:", err)
			}
		}(i+1, name)
	}
	wg.Wait()

	sort.Strings(names)
	_, err := store.Get(99)
	fmt.Printf("v%s %s %v %t\n", Version, strings.Join(names, ","), err, errors.Is(err, ErrNotFound))
}
