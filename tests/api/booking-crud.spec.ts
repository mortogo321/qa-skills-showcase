import { test, expect } from '@playwright/test';
import { apiCredentials } from '../../src/data/users';

// This suite exercises the full booking lifecycle against the public
// Restful-Booker demo API. Tests run in `.serial` because each step depends
// on state (bookingId, auth token) produced by the previous one. Reliability
// against this third-party service is handled via playwright.config's
// `retries` setting rather than hand-rolled waits/retry loops here.

const CREATE_PAYLOAD = {
  firstname: 'Jane',
  lastname: 'Doe',
  totalprice: 150,
  depositpaid: true,
  bookingdates: { checkin: '2026-08-01', checkout: '2026-08-10' },
  additionalneeds: 'Breakfast',
};

const UPDATE_PAYLOAD = {
  firstname: 'Janet',
  lastname: 'Smith',
  totalprice: 200,
  depositpaid: false,
  bookingdates: { checkin: '2026-09-01', checkout: '2026-09-05' },
  additionalneeds: 'Lunch',
};

test.describe.serial('Restful-Booker CRUD', () => {
  let bookingId: number;
  let token: string;

  test('GET /ping healthcheck returns 201 @smoke', async ({ request }) => {
    const res = await request.get('/ping');
    expect(res.status()).toBe(201);
  });

  test('POST /booking creates a booking and echoes the submitted fields', async ({ request }) => {
    const res = await request.post('/booking', { data: CREATE_PAYLOAD });
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(body.booking).toMatchObject(CREATE_PAYLOAD);
    expect(typeof body.bookingid).toBe('number');

    bookingId = body.bookingid;
  });

  test('GET /booking/{id} returns the created booking', async ({ request }) => {
    const res = await request.get(`/booking/${bookingId}`);
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(body).toMatchObject(CREATE_PAYLOAD);
  });

  test('POST /auth returns a token for the update step', async ({ request }) => {
    const res = await request.post('/auth', {
      data: apiCredentials,
    });
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(body.token).toBeTruthy();

    token = body.token;
  });

  test('PUT /booking/{id} performs a full update using the auth token', async ({ request }) => {
    const res = await request.put(`/booking/${bookingId}`, {
      data: UPDATE_PAYLOAD,
      headers: { Cookie: `token=${token}` },
    });
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(body).toMatchObject(UPDATE_PAYLOAD);
  });

  test('DELETE /booking/{id} removes the booking, then GET returns 404', async ({ request }) => {
    const del = await request.delete(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
    });
    expect([200, 201]).toContain(del.status());

    const res = await request.get(`/booking/${bookingId}`);
    expect(res.status()).toBe(404);
  });
});
