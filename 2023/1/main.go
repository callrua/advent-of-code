package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func parseCalibration(c string) int {
	chars := strings.Split(c, "")
	var ints []int
	for _, v := range chars {
		i, err := strconv.Atoi(v)
		if err == nil {
			ints = append(ints, i)
		}
	}

	var cal int
	if len(ints) > 1 {
		cs := fmt.Sprintf("%d%d", ints[0], ints[len(ints)-1])
		cal, _ = strconv.Atoi(cs)
	} else {
		cs := fmt.Sprintf("%d%d", ints[0], ints[0])
		cal, _ = strconv.Atoi(cs)
	}
	return cal
}

func total(i []int) int {
	var t int
	for _, v := range i {
		t += v
	}

	return t
}

func main() {
	var cals []int
	file, err := os.Open("input.txt")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		cals = append(cals, parseCalibration(line))
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}

	t := total(cals)
	fmt.Println(t)
}
