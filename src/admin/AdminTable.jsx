// frontend/src/admin/AdminTable.jsx
import React from 'react';

function ActionButtons({ row, onAction }) {
  return (
    <div className="flex gap-2">
      <button onClick={() => onAction('accept', row)} className="bg-blue-500 text-white px-3 py-1 rounded">Accept</button>
      <button onClick={() => onAction('complete', row)} className="bg-green-500 text-white px-3 py-1 rounded">Complete</button>
      <button onClick={() => onAction('reject', row)} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
    </div>
  );
}

export default function AdminTable({ loading, data, tabKey, refresh }) {
  const handleAction = async (action, row) => {
    // call patch on backend to update status - for scrap only for now
    if (!row || !row._id) return;
    const token = localStorage.getItem('scrap_deal_admin_token');
    if (tabKey !== 'scrap') {
      alert('Action not implemented for this service yet.');
      return;
    }
    try {
      const statusMap = { accept: 'assigned', complete: 'completed', reject: 'rejected' };
      const res = await fetch(`/api/admin/scrap/${row._id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ status: statusMap[action] })
      });
      const body = await res.json();
      if (!body.success) {
        alert(body.message || 'Failed to update status');
      } else {
        alert('Updated');
        refresh();
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div className="text-gray-500">No data yet for this service.</div>;

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="text-left bg-gray-50">
          <th className="px-4 py-3">ID</th>
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Phone</th>
          <th className="px-4 py-3">Item</th>
          <th className="px-4 py-3">Qty</th>
          <th className="px-4 py-3">When</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row._id} className="border-b">
            <td className="px-4 py-3 text-sm">{String(row._id).slice(0, 24)}</td>
            <td className="px-4 py-3">{row.name || '-'}</td>
            <td className="px-4 py-3">{row.phone || '-'}</td>
            <td className="px-4 py-3">{row.itemType || row.device || '-'}</td>
            <td className="px-4 py-3">{row.quantityWeight || row.qty || '-'}</td>
            <td className="px-4 py-3">{row.preferredPickupDate ? `${row.preferredPickupDate} ${row.preferredPickupTime || ''}` : (row.when || '-')}</td>
            <td className="px-4 py-3"><span className="inline-block px-2 py-1 rounded bg-gray-100 text-sm">{row.status || 'new'}</span></td>
            <td className="px-4 py-3"><ActionButtons row={row} onAction={handleAction} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
