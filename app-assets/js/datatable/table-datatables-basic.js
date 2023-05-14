/**
 * DataTables Basic
 */

$(function () {
  'use strict';

  var dt_basic_table = $('.datatables-basic'),
    dt_date_table = $('.dt-date'),
    dt_complex_header_table = $('.dt-complex-header'),
    dt_row_grouping_table = $('.dt-row-grouping'),
    dt_multilingual_table = $('.dt-multilingual'),
    assetPath = 'app-assets/';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // DataTable with buttons
  // --------------------------------------------------------------------

  if (dt_basic_table.length) {
    var dt_basic = dt_basic_table.DataTable({
      ajax: assetPath + 'table-datatable.json',
      columns: [
        { data: 'responsive_id' },
        { data: 'id' },
        { data: 'id' }, // used for sorting so will hide this column
        { data: 'product_name' },
        { data: 'barcode' },
        { data: 'stock' },
        { data: 'price' },
        { data: 'discount' },
        { data: 'aPrice' },
        { data: '' }, 
 
      ],
      columnDefs: [
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            return (
              '<div class="form-check"> <input class="form-check-input dt-checkboxes" type="checkbox" value="" id="checkbox' +
              data +
              '" /><label class="form-check-label" for="checkbox' +
              data +
              '"></label></div>'
            );
          },
          checkboxes: {
            selectAllRender:
              '<div class="form-check"> <input class="form-check-input dt-checkboxes" type="checkbox" value="" id="checkboxSelectAll" /><label class="form-check-label" for="checkboxSelectAll"></label></div>'
          }
        },
        {
          targets: 2,
          visible: false
        },
        {
          // Avatar image/badge, Name and post
          targets: 3,
          responsivePriority: 4,

        },
        {
          responsivePriority: 1,
          targets: 4
        },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full['status'];
            var $status = {
              1: { title: 'Current', class: 'badge-light-primary' },
              2: { title: 'Professional', class: ' badge-light-success' },
              3: { title: 'Rejected', class: ' badge-light-danger' },
              4: { title: 'Resigned', class: ' badge-light-warning' },
              5: { title: 'Applied', class: ' badge-light-info' }
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-flex text-center justify-content-center action">' +
              '<button class="  dropdown-toggle hide-arrow text-primary btn btn-info " data-bs-toggle="dropdown">' +
              'Action' +
              '</button>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="javascript:;" class="dropdown-item">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
              'Details</a>' +
              '<a href="javascript:;" class="dropdown-item">' +
              feather.icons['archive'].toSvg({ class: 'font-small-4 me-50' }) +
              'Archive</a>' +
              '<a href="javascript:;" class="dropdown-item delete-record">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Delete</a>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[1, 'desc']],
      dom: `<"p-1"<"head-label">>
      <" align-items-center mx-0 justify-content-start flex-row-reverse btnSF row"<"d-inline-block w-auto"B>
      <"d-inline-block w-auto btn btnSetting"  > <"d-inline-block w-auto"f>>t
      <"d-flex justify-content-between my-5 tFoot  row"<"col-6"i>
       <"col-6"<"row"<"col text-end showData"l> <"col text-end showPaginate"p>>>>`,

      buttons: [
        {
          text: feather.icons['filter'].toSvg({ class: 'me-50 font-small-4' }) + '',
          className: 'create-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#modals-slide-in-2'
          },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }
        , {
          extend: 'collection',
          className: 'btn btn-outline-secondary dropdown-toggle dropdown mx-3 position-relative',
          text: feather.icons['share'].toSvg({ class: 'font-small-4 me-50' }) + '',
          buttons: [
            {
              extend: 'print',
              text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
              className: 'dropdown-item',
              exportOptions: { columns: [3, 4, 5, 6, 7] }
            },
            {
              extend: 'csv',
              text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
              className: 'dropdown-item',
              exportOptions: { columns: [3, 4, 5, 6, 7] }
            },
            {
              extend: 'excel',
              text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
              className: 'dropdown-item',
              exportOptions: { columns: [3, 4, 5, 6, 7] }
            },
            {
              extend: 'pdf',
              text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
              className: 'dropdown-item',
              exportOptions: { columns: [3, 4, 5, 6, 7] }
            },
            {
              extend: 'copy',
              text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
              className: 'dropdown-item',
              exportOptions: { columns: [3, 4, 5, 6, 7] }
            }
          ],
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
            $(node).parent().removeClass('btn-group');
            setTimeout(function () {
              $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex');
            }, 50);
          }
        }
        ,
        {
          text: feather.icons['settings'].toSvg({ class: 'me-50 font-small-4' }) + '',
          className: '  btn btn-secondary',
         
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }
      ],
      displayLength: 5,
      lengthMenu: [5, 10, 25, 50, 75, 100],
      language: {
        paginate: { 

          previous: feather.icons['chevron-left'].toSvg({ class: 'font-small-4 me-50' }),
          next: feather.icons['chevron-right'].toSvg({ class: 'font-small-4 me-50' })
        }
      }
    });
  }


});
