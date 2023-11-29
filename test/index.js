import axios from "axios";
import assert from "assert";

const swapiUrl = "https://swapi.dev/api"; // SWAPI endpoint

describe("Star Wars API Tests", function () {
  this.timeout(30000); // Changes default timeout to allow promises to resolve

  // Test Case 1: Retrieve a list of all Star Wars characters
  it("should retrieve a list of all Star Wars characters", async function () {
    try {
      const response = await axios.get(`${swapiUrl}/people`);
      const results = await response.data.results;

      assert.strictEqual(response.status, 200, "Unexpected status code"); // 1.a: Verify that the response is 200
      assert.ok(
        Array.isArray(results) && results.length > 0,
        "Character array should exist and have at least one character"
      ); // 1.b: Verify that at least one character is returned
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  // Test Case 2: Retrieve details for a specific Star Wars character
  it("should retrieve details for a specific Star Wars character", async function () {
    const characterInfo = { name: "Luke Skywalker", id: "1" };

    try {
      const response = await axios.get(
        `${swapiUrl}/people/${characterInfo.id}`
      );
      const result = await response.data;

      assert.strictEqual(response.status, 200, "Unexpected status code"); // 2.a: Verify that the response is 200
      assert.strictEqual(
        result.name,
        characterInfo.name,
        `Incorrect character name returned from: ${swapiUrl}/people/${characterInfo.id}`
      ); // 2.b: Verify that the response includes the correct character details, and only one result is returned.
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  // Test Case 3: Retrieve a list of all Star Wars films
  it("should retrieve a list of all Star Wars films", async function () {
    try {
      const response = await axios.get(`${swapiUrl}/films`);
      const films = response.data.results;

      assert.strictEqual(response.status, 200, "Unexpected status code"); // 3.a: Verify that the response is 200
      assert.ok(
        Array.isArray(films) && films.length > 0,
        "Films array should exist and have at least one film"
      ); // 3.b: Verify that at least one film is returned.
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to make the test fail
    }
  });

  // Test Case 4: Retrieve details for a specific Star Wars film
  it("should retrieve details for a specific Star Wars film", async function () {
    const filmInfo = { name: "A New Hope", id: "1" };

    try {
      const response = await axios.get(`${swapiUrl}/films/${filmInfo.id}`);
      const film = response.data;

      assert.strictEqual(response.status, 200, "Unexpected status code"); // 4.a: Verify that the response is 200
      assert.strictEqual(
        film.title,
        filmInfo.name,
        `Incorrect film returned from: ${swapiUrl}/films/${filmInfo.id}`
      ); // 4.b: Verify that the response includes the correct film details, and that only one result is returned.
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to make the test fail
    }
  });
});
